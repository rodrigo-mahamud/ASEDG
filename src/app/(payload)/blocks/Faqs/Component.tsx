import Container from '@/components/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Title from '@/components/ui/title'

import { Type } from '.'

export default function RichText({ faqsGoup, title, description }: Type) {
  return (
    <Container>
      <Title title={title} subtitle={description}></Title>
      <Accordion
        className="px-5 bg-white rounded-xl border-border border transition-generic mainShadow"
        type="single"
        collapsible
      >
        {faqsGoup.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <h4 className="text-start text-lg font-medium line-clamp-1">{faq.question}</h4>
            </AccordionTrigger>
            <AccordionContent className="text-base ml-3 pb-8 pr-4 text-pretty">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  )
}
