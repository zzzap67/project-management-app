import { API_URL, AuthToken } from 'const';
import { IBoardsList } from 'types';

export async function getBoardsList() {
  let foundData: IBoardsList[] = [];
  try {
    const response = await fetch(`${API_URL}/boards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    });
    foundData = await response.json();
  } catch (e) {
    const err = e as Error;
    console.log(err.name);
  }

  return foundData;
}
