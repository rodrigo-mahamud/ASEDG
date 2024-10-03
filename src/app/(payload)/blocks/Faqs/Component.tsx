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
      <Accordion className="px-4" type="single" collapsible>
        {faqsGoup.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <h2 className="text-start text-lg font-medium line-clamp-1">{faq.question}</h2>
            </AccordionTrigger>
            <AccordionContent className="text-base ml-3 pb-4">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  )
}
