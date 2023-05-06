import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.white,
  },
  solicitationTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: "#000000",
    alignSelf: "flex-start",
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: 45,
    
  },

  cardJob: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large,
    padding: SIZES.xLarge,
    marginVertical: SIZES.medium,
    marginHorizontal: SIZES.small,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap:"wrap"
  }
});

export default styles;
