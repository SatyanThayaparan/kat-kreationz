import { faqItems, policies } from '../data/content'

export function Info() {
  return (
    <section id="info" className="page section-anchor info-page" aria-labelledby="info-heading">
      <header className="page-header page-header--open content-width">
        <h2 id="info-heading" className="section-title">
          Before you book
        </h2>
        <p className="section-copy">
          What to expect and how we work together — so your celebration feels settled before the
          balloons go up.
        </p>
      </header>

      <div className="info-stage content-width">
        <article className="info-block" aria-labelledby="faq-heading">
          <h3 id="faq-heading" className="info-block__title">
            FAQ
          </h3>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.id} className="faq-item">
                <summary>{item.question}</summary>
                <div className="faq-item__panel">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </article>

        <article className="info-block" aria-labelledby="policies-heading">
          <h3 id="policies-heading" className="info-block__title">
            Policies
          </h3>
          <dl className="policy-list">
            {policies.map((policy) => (
              <div key={policy.id} className="policy-item">
                <dt>{policy.title}</dt>
                <dd>{policy.body}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  )
}
