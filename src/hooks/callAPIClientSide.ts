const callAPIClientSide = async (url:string, options:Object) => {
    const result = await fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while call API");
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
}

export default callAPIClientSide