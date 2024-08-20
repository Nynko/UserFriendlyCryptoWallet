import { ReactNode } from "react";
import { useRefresh } from "../../hooks/useRefresh";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

interface RefreshViewProps{
    children: ReactNode;
    otherRefresh?: (()=>void)[] | undefined;
}

export function RefreshView({children, otherRefresh}: RefreshViewProps){
    const [refreshing, onRefresh] = useRefresh(otherRefresh);

    return (
        <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {children}
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 2,
    },
  });