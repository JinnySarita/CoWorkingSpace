import { formatDate, formatDateTime } from "@/utils/DateTime";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";

export interface ReservationTableProps {
  reservations: ReservationItem[];
}

export interface ReservationItem {
  id: string;
  coWorkingSpaceName: string;
  userName?: string;
  noOfRooms: number;
  reservedDate: string;
  reservedAt: string;
}

export default function ReservationTableRows({
  reservations,
}: ReservationTableProps) {
  const router = useRouter();

  return (
    <TableBody>
      {reservations.map((reservation) => (
        <TableRow
          key={reservation.id}
          onClick={() => router.push(`/reservations/${reservation.id}`)}
          className="cursor-pointer hover:bg-slate-50"
        >
          <TableCell>{reservation.coWorkingSpaceName}</TableCell>
          {reservation.userName && (
            <TableCell>{reservation.userName}</TableCell>
          )}
          <TableCell>{reservation.noOfRooms}</TableCell>
          <TableCell>{formatDate(reservation.reservedDate)}</TableCell>
          <TableCell>{formatDateTime(reservation.reservedAt)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
