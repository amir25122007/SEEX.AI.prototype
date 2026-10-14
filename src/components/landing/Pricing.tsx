import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { headerActions } from "@/data/navigation";
import { type PricingPlan, pricingIntro, pricingPlans } from "@/data/pricing";
import { cn } from "@/lib/cn";
import styles from "./Pricing.module.css";

/** game-icons:polar-star, 22.14px. */
function StarIcon() {
  return (
    <svg className={styles.star} width="22.14" height="22.14" viewBox="114.92 6247.69 22.15 22.14" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M125.995 6247.69C125.32 6251.9 124.753 6254.4 123.197 6255.96C121.641 6257.51 119.138 6258.08 114.927 6258.76C119.138 6259.43 121.641 6260 123.197 6261.56C124.753 6263.11 125.32 6265.62 125.995 6269.83C126.67 6265.62 127.238 6263.11 128.794 6261.55C130.355 6260 132.858 6259.43 137.072 6258.76C132.858 6258.08 130.355 6257.51 128.798 6255.96C127.238 6254.4 126.67 6251.9 125.995 6247.69ZM133.828 6250.93C131.681 6252.48 130.031 6253.6 128.559 6254.22C128.798 6254.66 129.075 6255.04 129.394 6255.36C129.713 6255.68 130.088 6255.95 130.533 6256.2C131.161 6254.72 132.277 6253.07 133.828 6250.93ZM118.175 6250.93C119.728 6253.08 120.839 6254.72 121.463 6256.19C121.903 6255.95 122.278 6255.68 122.597 6255.36C122.916 6255.04 123.192 6254.66 123.431 6254.22C121.964 6253.6 120.319 6252.49 118.175 6250.93ZM130.533 6261.31C130.088 6261.56 129.713 6261.84 129.394 6262.15C129.075 6262.47 128.798 6262.85 128.555 6263.29C130.031 6263.92 131.681 6265.03 133.828 6266.59C132.272 6264.44 131.156 6262.79 130.533 6261.31ZM121.463 6261.32C120.839 6262.79 119.723 6264.44 118.172 6266.59C120.314 6265.04 121.964 6263.92 123.436 6263.29C123.192 6262.85 122.916 6262.47 122.597 6262.15C122.278 6261.84 121.903 6261.56 121.463 6261.32Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** material-symbols-light:check, 24px. */
function CheckIcon() {
  return (
    <svg className={styles.check} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M9.55 17.077L4.58 12.1L5.294 11.387L9.55 15.644L18.706 6.488L19.419 7.202L9.55 17.077Z" fill="currentColor" />
    </svg>
  );
}

function Plan({ plan }: { plan: PricingPlan }) {
  return (
    <li className={cn(styles.plan, plan.tone === "lime" ? styles.planLime : styles.planOrange)}>
      {/* Pre-rendered blurred shadows (PNG): live blur box-shadows stalled Safari while scaling. */}
      <span aria-hidden="true" className={cn(styles.layer, styles.shadow)} />
      <span aria-hidden="true" className={cn(styles.layer, styles.glow)} />
      {plan.popular ? <span className={styles.popular}>{plan.popular}</span> : null}
      <span className={styles.discount}>
        <span className="sr-only">Скидка </span>
        {plan.discount}
      </span>

      <h3 className={styles.name}>{plan.name}</h3>
      <p className={styles.subtitle}>{plan.subtitle}</p>

      {/* Prices are written without a thousands separator, as in Figma ("1990"). */}
      <p className={styles.oldPrice}>
        <span className="sr-only">Цена без скидки: {plan.oldPrice} рублей в месяц</span>
        <s aria-hidden="true">
          {plan.oldPrice}
          <span className={styles.rub}>₽</span>
        </s>
      </p>
      <p className={styles.priceRow}>
        <span className="sr-only">Цена со скидкой: {plan.price} рублей в месяц</span>
        <span className={styles.price} style={{ width: plan.priceBoxWidth }} aria-hidden="true">
          {plan.price}
        </span>
        <span className={styles.perMonth} aria-hidden="true">
          ₽ / мес
        </span>
      </p>
      <p className={styles.period}>{plan.period}</p>

      <Link href={headerActions.cta.href} className={styles.cta} aria-label={`${pricingIntro.cta} ${plan.name}`}>
        {pricingIntro.cta}
      </Link>

      <hr className={styles.divider} />

      <p className={styles.generations}>
        <StarIcon />
        {plan.generations}
      </p>

      <p className={styles.groupTitle}>Возможности</p>
      <ul className={styles.list}>
        {plan.features.map((item) => (
          <li key={item} className={styles.item}>
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>

      <p className={cn(styles.groupTitle, styles.groupTitleModels)}>Доступ к моделям</p>
      <ul className={styles.list}>
        {plan.models.map((item) => (
          <li key={item} className={styles.item}>
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}

/**
 * "Выберите свой формат доступа" — Figma final › pricing. Section box: page y 5666.75
 * (heading) – 6518.76 (bottom of PRO). The warm backdrop behind it belongs to Audience.
 */
export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className={styles.section}>
      <div className={styles.canvas}>
        <SectionHeading
          id="pricing-title"
          size="56"
          className={styles.heading}
          descriptionClassName={styles.description}
          lines={[
            { text: pricingIntro.title[0], className: "ml-[64.5px]" },
            { text: pricingIntro.title[1], tone: "lime", className: "-mt-[0.24px]" },
          ]}
          description={pricingIntro.text}
        />
        <ul className={styles.plans}>
          {pricingPlans.map((plan) => (
            <Plan key={plan.id} plan={plan} />
          ))}
        </ul>
      </div>
    </section>
  );
}
