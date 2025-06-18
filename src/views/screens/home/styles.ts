import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchInput: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
    color: "#111827",
  },
  winesList: {
    flex: 1,
  },
  winesListContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  wineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  imageContainer: {
    width: 80,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
    marginRight: 16,
  },
  wineImage: {
    width: "100%",
    height: "100%",
  },
  wineDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  wineName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  wineType: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  wineRegion: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  winePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#059669",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  priceAndCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

