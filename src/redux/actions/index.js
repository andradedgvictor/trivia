export const SAVE_EMAIL_AND_NAME = 'SAVE_EMAIL_AND_NAME';

export async function fetchAPIToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data;
}

export const saveEmailAndName = (email, name) => ({
  type: SAVE_EMAIL_AND_NAME,
  email,
  name,
});
