const createParamsAPI = (paramsList:Array<string>, paramsValue:any) => {
    let parameter = (paramsValue != null) ? "?" : "";
    for(const i of paramsList) {
        if (paramsValue[i] != null) {
            parameter=parameter+`${i}=${paramsValue[i]}&`
        }
    }
    const parameterFinal = parameter.slice(0, -1)

    return parameterFinal
}

export default createParamsAPI