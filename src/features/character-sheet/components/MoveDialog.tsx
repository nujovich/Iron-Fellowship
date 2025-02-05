import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { MarkdownRenderer } from "../../../components/MarkdownRenderer/MarkdownRenderer";
import { Move, ROLLABLES, ROLLABLE_TRACKS } from "../../../types/Moves.type";
import CloseIcon from "@mui/icons-material/Close";
import { StatsMap } from "../../../types/Character.type";
import { StatComponent } from "./StatComponent";
import { STATS } from "../../../types/stats.enum";

export interface MoveDialogProps {
  move?: Move;
  handleClose: () => void;

  stats: StatsMap;
  health: number;
  spirit: number;
  supply: number;
}

const labels: { [key in ROLLABLES]: string } = {
  [STATS.EDGE]: "Edge",
  [STATS.HEART]: "Heart",
  [STATS.IRON]: "Iron",
  [STATS.SHADOW]: "Shadow",
  [STATS.WITS]: "Wits",
  [ROLLABLE_TRACKS.HEALTH]: "Health",
  [ROLLABLE_TRACKS.SPIRIT]: "Spirit",
  [ROLLABLE_TRACKS.SUPPLY]: "Supply",
};

export function MoveDialog(props: MoveDialogProps) {
  const { move, handleClose, stats, health, spirit, supply } = props;

  const rollableValues: { [key in ROLLABLES]: number } = {
    ...stats,
    health,
    spirit,
    supply,
  };

  return (
    <Dialog open={!!move} onClose={() => handleClose()}>
      <DialogTitle display={"flex"} justifyContent={"space-between"}>
        <span>{move?.name}</span>
        <span>
          <IconButton onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </span>
      </DialogTitle>
      <DialogContent>
        {move?.stats && (
          <Box display={"flex"} flexWrap={"wrap"}>
            {move.stats.map((stat, index) => (
              <StatComponent
                key={index}
                label={labels[stat]}
                value={rollableValues[stat]}
                sx={{ mt: 1, mr: 1 }}
              />
            ))}
          </Box>
        )}
        {move?.text && <MarkdownRenderer markdown={move?.text} />}
      </DialogContent>
    </Dialog>
  );
}
