import { google } from "googleapis";

function getAuth() {
  if (
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_SHEETS_ID
  ) {
    throw new Error("Google Sheets not configured.");
  }
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// Rows are written with USER_ENTERED so amounts and dates keep their native
// types in the sheet. That also means a submitted value that starts with
// = + - @ would be evaluated as a formula (e.g. =IMPORTDATA(...) could leak
// other rows to an attacker's server). A leading apostrophe forces the cell to
// plain text and is not displayed; everything else is stored exactly as before.
function neutralizeFormula(v: string): string {
  return /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
}

export async function appendRow(sheetName: string, values: string[]): Promise<void> {
  const sheets = google.sheets({ version: "v4", auth: getAuth() });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values.map(neutralizeFormula)] },
  });
}

export async function emailExistsInSheet(sheetName: string, emailCol: string, email: string): Promise<boolean> {
  const sheets = google.sheets({ version: "v4", auth: getAuth() });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${sheetName}!${emailCol}:${emailCol}`,
  });
  const rows = res.data.values ?? [];
  return rows.some((row) => row[0]?.toLowerCase() === email.toLowerCase());
}

export async function deleteRowsByEmail(sheetName: string, emailCol: string, email: string): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID!;
  const sheets = google.sheets({ version: "v4", auth: getAuth() });

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = meta.data.sheets?.find(s => s.properties?.title === sheetName);
  if (sheet?.properties?.sheetId == null) return;
  const sheetId = sheet.properties.sheetId;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${emailCol}:${emailCol}`,
  });

  const rows = res.data.values ?? [];
  const toDelete = rows
    .map((row, i) => ({ i, val: row[0] }))
    .filter(({ i, val }) => i > 0 && val?.toLowerCase() === email.toLowerCase())
    .map(({ i }) => i)
    .reverse();

  if (toDelete.length === 0) return;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: toDelete.map(rowIndex => ({
        deleteDimension: {
          range: { sheetId, dimension: "ROWS", startIndex: rowIndex, endIndex: rowIndex + 1 },
        },
      })),
    },
  });
}

// Checks column F (payment intent ID) in Donations for duplicate webhook delivery
export async function paymentIntentProcessed(piId: string): Promise<boolean> {
  const sheets = google.sheets({ version: "v4", auth: getAuth() });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Donations!F:F",
  });
  const rows = res.data.values ?? [];
  return rows.some((row) => row[0] === piId);
}
