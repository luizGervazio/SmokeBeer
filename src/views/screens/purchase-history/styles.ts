import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  filterButton: {
    padding: 8,
  },
  filterMenu: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 8,
  },
  filterOption: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  filterOptionActive: {
    backgroundColor: "#EFF6FF",
  },
  filterOptionText: {
    fontSize: 16,
    color: "#6B7280",
  },
  filterOptionTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  summaryCard: {
    flex: 1,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  purchasesList: {
    flex: 1,
  },
  purchasesListContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  purchaseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  purchaseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  purchaseId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  purchaseDate: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  itemsContainer: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemImage: {
    width: 40,
    height: 50,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  itemType: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#059669",
  },
  moreItems: {
    fontSize: 12,
    color: "#6B7280",
    fontStyle: "italic",
    marginLeft: 52,
  },
  purchaseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: "#6B7280",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
})