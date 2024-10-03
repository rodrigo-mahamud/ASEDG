import Container from '@/components/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/lib/accordion'
import Title from '@/components/lib/title'

import { Type } from '.'

export default function RichText({ faqsGoup, title, description }: Type) {
  return (
    <Container>
      <Title title={title} subtitle={description}></Title>
      <Accordion type="single" collapsible>
        {faqsGoup.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-start">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  )
}
