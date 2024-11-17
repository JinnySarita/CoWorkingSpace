export default async function postSpace(
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/coworkingspaces`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    throw new Error("Error posting data");
  }
}
