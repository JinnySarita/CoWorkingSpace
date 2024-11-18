export default async function putSpace(
  token: string,
  spaceId: string,
  name: string,
  address: string,
  operatingHours: string,
  province: string,
  postalcode: string,
  tel: string,
  picture: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/coworkingspaces/${spaceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          address,
          operatingHours,
          province,
          postalcode,
          tel,
          picture,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error updating data");
  }
}
