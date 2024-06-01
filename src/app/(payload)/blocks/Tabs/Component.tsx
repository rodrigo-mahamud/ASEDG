// import React from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/lib/tabs'
// import Title from '@/components/lib/title'
// import CalendarComponent from './ui/calendarComponent'
// import { IconBus, IconCalendarEvent, IconNews } from '@tabler/icons-react'
// import BusList from './ui/busList'
// import NewsGrid from './ui/newsGrid'

// export default function TabsBlock() {
//   return (
//     <Tabs defaultValue="calendar" className="container mx-auto py-32 relative">
//       <div className="flex justify-end absolute right-0 px-[inherit]">
//         <TabsList className="flex space-x-4">
//           <TabsTrigger value="news">
//             <IconNews className="w-4 h-4 mr-1"></IconNews>Novedades
//           </TabsTrigger>
//           <TabsTrigger value="calendar">
//             <IconCalendarEvent className="w-4 h-4 mr-1"></IconCalendarEvent> Calendario
//           </TabsTrigger>
//           <TabsTrigger value="transports">
//             <IconBus className="w-4 h-4 mr-1"></IconBus>Transportes
//           </TabsTrigger>
//         </TabsList>
//       </div>
//       <TabsContent value="news">
//         <Title
//           title="News"
//           subtitle={
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores suscipit facilis in nobis ut nesciunt doloremque dolor quae rem est, ducimus ratione nisi magnam aliquid esse quo accusamus nihil quidem!'
//           }
//         ></Title>
//         <NewsGrid></NewsGrid>
//       </TabsContent>
//       <TabsContent value="calendar">
//         <Title
//           title="Calendario de Eventos"
//           subtitle={
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores suscipit facilis in nobis ut nesciunt doloremque dolor quae rem est, ducimus ratione nisi magnam aliquid esse quo accusamus nihil quidem!'
//           }
//         ></Title>
//         <CalendarComponent></CalendarComponent>
//       </TabsContent>
//       <TabsContent value="transports">
//         <Title
//           title="Autobuses San Esteban de Gormaz"
//           subtitle={
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores suscipit facilis in nobis ut nesciunt doloremque dolor quae rem est, ducimus ratione nisi magnam aliquid esse quo accusamus nihil quidem!'
//           }
//         ></Title>
//         <BusList></BusList>
//       </TabsContent>
//     </Tabs>
//   )
// }
