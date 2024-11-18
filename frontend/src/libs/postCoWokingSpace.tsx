export default async function postSpace(
  token: string,
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
    const responseBody = await response.json();

    if (!response.ok) {
      // Use the parsed responseBody for error handling if needed
      throw new Error(
        `Error: ${response.status} - ${
          responseBody.message || response.statusText
        }`
      );
    }

    return responseBody; // Return the parsed JSON
  } catch (error) {
    console.error("Error posting data:", error);
    throw new Error("Error posting data");
  }
}
