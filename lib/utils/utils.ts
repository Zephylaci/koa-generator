const ErrorType = {
    P: "Parameter",
    N: "NetWork",
    D: "DataBase",
    F: "File",
};
export const createErrorMessage = ({ from = "Matin", text = "Error", type = "Other" }) => {
    const TypeText = ErrorType[type] || "Other";
    return `${from} happen ${TypeText} Error: ${text}`;
};
