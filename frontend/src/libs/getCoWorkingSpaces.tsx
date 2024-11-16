export default async function getCoWorkingSpaces() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/coworkingspaces`
    );

    const data = await response.json();

    const coWorkingSpaces = data.data;

    return coWorkingSpaces;
  } catch (error) {
    throw new Error("Error fetching data");
  }
}
