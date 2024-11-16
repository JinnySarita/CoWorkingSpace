export default async function deleteReservation(token: string, id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error deleting reservation");
  }
}
