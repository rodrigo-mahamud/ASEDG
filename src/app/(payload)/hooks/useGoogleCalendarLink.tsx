import dayjs from "dayjs";

interface EventDetails {
   title?: string;
   start?: Date;
   end?: Date;
   description?: string;
   location?: string;
}

const useGoogleCalendarLink = ({
   title = "Evento",
   start = new Date(),
   end = dayjs(start).add(1, "hour").toDate(),
   description = "",
   location = "",
}: EventDetails): string => {
   const startDate = dayjs(start).format("YYYYMMDDTHHmmss[Z]");
   const endDate = dayjs(end).format("YYYYMMDDTHHmmss[Z]");
   const details = encodeURIComponent(description);
   const locationEncoded = encodeURIComponent(location);

   return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
   )}&dates=${startDate}/${endDate}&details=${details}&location=${locationEncoded}&sf=true&output=xml`;
};

export default useGoogleCalendarLink;
