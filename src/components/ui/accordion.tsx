import { useState } from 'react';
import type { FaqItem } from '../../content/landing';

type AccordionProps = {
  items: FaqItem[];
  allowMultiple?: boolean;
};

/** Headless accordion (custom, no radix). State only, no effects. */
export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [open, setOpen] = useState<number[]>([]);

  function toggle(index: number) {
    setOpen((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      return allowMultiple ? [...prev, index] : [index];
    });
  }

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const panelId = `faq-panel-${index}`;
        return (
          <div className="faq" key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="faq-toggle"
            >
              <span className="heading-s">{item.question}</span>
              <span className="plus" aria-hidden="true" data-open={isOpen} />
            </button>
            <div className="faq-body" data-open={isOpen} id={panelId}>
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
