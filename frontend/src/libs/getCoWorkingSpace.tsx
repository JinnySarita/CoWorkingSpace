export default async function getCoWorkingSpace(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/coworkingspaces/${id}`
    );

    const data = await response.json();

    const coWorkingSpaces = data.data;
    console.log("coWorkingSpaces", coWorkingSpaces);

    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
}
