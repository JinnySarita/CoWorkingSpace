export default async function getReservations(token: string, id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
}
