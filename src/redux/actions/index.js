export const SAVE_EMAIL_AND_NAME = 'SAVE_EMAIL_AND_NAME';
export const SUM_SCORE = 'SUM_SCORE';

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

export async function fetchAPIQuestions(token) {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('token inválido');
  }
}

export const sumScore = (totalPoints) => ({
  type: SUM_SCORE,
  totalPoints,
});
