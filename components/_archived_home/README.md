# Archived homepage sections

Removed from `app/page.tsx` on 2026-06-07 per Deego — repositioning the homepage away from the "consultation" framing ("i have an idea but no business... too many ppl a do that, like it too easy").

| File | Was | Why archived |
|---|---|---|
| `FeaturesSection.tsx` | "What We Offer" section | Included a "Consultation" feature card — cut as part of moving off the consultation angle |
| `HowItWorksSection.tsx` | "How It Works" section | Cut alongside What We Offer to simplify the homepage flow |
| `FAQSection.tsx` | "Frequently Asked Questions" section | Archived per same request |

To restore: move the file back to `components/home/`, re-add the import + JSX line in `app/page.tsx`.
