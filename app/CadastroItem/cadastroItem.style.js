import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    input: {
        height: 40,
        fontSize: 16,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingLeft: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: "69%",
    },
    label: {
        fontSize: 14,
        color: "#000",
        marginBottom: 4,
    },
    container: {
        width: "80%",
        borderRadius: 10,
        marginBottom: 10,
    },
    borderError: {
        borderWidth: 1,
        borderColor: "rgba(200,0,50,1)",
    },
    errorMessage: {
        fontSize: 12,
        color: "rgba(200,0,50,1)",
        textAlign: "center",
        marginTop: 5,
    },
    buttonNew: {
        alignSelf: "flex-start",
        marginTop: 15,
        marginRight: 22,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: "#455471",
    },
    button: {
        alignSelf: "flex-end",
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: "#455471",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    formQtdInput: {
        backgroundColor: "#f4f4f4",
        // paddingTop: 1,
        height: "100%",
    },
    formQtdAction: {
        backgroundColor: "#455471",
        paddingVertical: 11,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: "100%",
        overflow: "hidden",
    },
    formQtdShadow: {
        height: "100%",
        fontSize: 16,
        fontWeight: "600",
        color: "#363636",
        backgroundColor: "#ddd",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        textAlign: "center",
        overflow: "hidden",
    },
    rowCenter: {
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default styles;
