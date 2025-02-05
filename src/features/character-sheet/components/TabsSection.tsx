import { Box, Card, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { TRACK_TYPES } from "../../../types/Track.type";
import { AssetsSection } from "./AssetsSection";
import { ProgressTrackSection } from "./ProgressTrackSection";
import { CharacterSection } from "./CharacterSection";
import { MovesSection } from "./MovesSection";

enum TABS {
  MOVES,
  ASSETS,
  VOWS,
  JOURNEYS,
  FRAYS,
  CHARACTER,
}

export function TabsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.ASSETS);

  useEffect(() => {
    if (!isMobile && selectedTab === TABS.MOVES) {
      setSelectedTab(TABS.ASSETS);
    }
  }, [selectedTab, isMobile]);

  return (
    <Card
      variant={"outlined"}
      sx={{ flexGrow: 1, mt: 2, display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={(evt, value) => setSelectedTab(value)}
          variant={"scrollable"}
          scrollButtons={"auto"}
        >
          {isMobile && <Tab label={"Moves"} value={TABS.MOVES} />}
          <Tab label="Assets" value={TABS.ASSETS} />
          <Tab label="Vows" value={TABS.VOWS} />
          <Tab label="Combat" value={TABS.FRAYS} />
          <Tab label="Journeys" value={TABS.JOURNEYS} />
          <Tab label="Character" value={TABS.CHARACTER} />
        </Tabs>
      </Box>
      <Box
        flexGrow={1}
        overflow={"auto"}
        bgcolor={(theme) =>
          selectedTab === TABS.ASSETS ? theme.palette.grey[100] : undefined
        }
      >
        {selectedTab === TABS.MOVES && <MovesSection />}
        {selectedTab === TABS.ASSETS && <AssetsSection />}
        {selectedTab === TABS.VOWS && (
          <ProgressTrackSection
            type={TRACK_TYPES.VOW}
            typeLabel={"Vow"}
            showPersonalIfInCampaign
          />
        )}
        {selectedTab === TABS.FRAYS && (
          <ProgressTrackSection
            type={TRACK_TYPES.FRAY}
            typeLabel={"Combat Track"}
          />
        )}
        {selectedTab === TABS.JOURNEYS && (
          <ProgressTrackSection
            type={TRACK_TYPES.JOURNEY}
            typeLabel={"Journey"}
          />
        )}
        {selectedTab === TABS.CHARACTER && <CharacterSection />}
      </Box>
    </Card>
  );
}
