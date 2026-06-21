import type { RatingBreakdownItem, ReviewStats, Testimonial } from "@/types/testimonial"

export const reviewStats: ReviewStats = {
  average: 4.9,
  totalReviews: 1240,
  recommendPercent: 98,
}

export const ratingBreakdown: RatingBreakdownItem[] = [
  { stars: 5, percent: 92 },
  { stars: 4, percent: 6 },
  { stars: 3, percent: 1 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 0 },
]

export const trustHighlights = [
  { label: "10K+", description: "Happy customers" },
  { label: "90-Day", description: "Repair warranty" },
  { label: "Same Day", description: "Most repairs" },
  { label: "98%", description: "Would recommend" },
]

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael Chen",
    initials: "MC",
    location: "London, UK",
    review:
      "My iPhone took a dip in water and looked done for. They had it working again in under two hours, and the screen protector they fitted is flawless. Fair price and clear communication throughout.",
    rating: 5,
    device: "iPhone 14 Pro",
    service: "Water Damage Repair",
    date: "2 days ago",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    initials: "SJ",
    location: "Manchester, UK",
    review:
      "Battery life on my Samsung was terrible. They swapped in a quality replacement and explained the warranty before I left. It now easily lasts a full day — exactly what I needed.",
    rating: 5,
    device: "Samsung S23 Ultra",
    service: "Battery Replacement",
    date: "1 week ago",
  },
  {
    id: "3",
    name: "David Rodriguez",
    initials: "DR",
    location: "Birmingham, UK",
    review:
      "Cracked screen repaired without a hitch. They offered a loaner while mine was in the shop, which saved my workday. Professional team and a result that looks factory-new.",
    rating: 5,
    device: "Google Pixel 7",
    service: "Screen Repair",
    date: "3 days ago",
  },
  {
    id: "4",
    name: "Emily Watson",
    initials: "EW",
    location: "Leeds, UK",
    review:
      "MacBook wouldn't charge — I expected the worst. They diagnosed a faulty port in minutes, fixed it same day, and didn't push unnecessary extras. Honest service I would use again.",
    rating: 5,
    device: "MacBook Pro",
    service: "Charging Port Repair",
    date: "5 days ago",
  },
  {
    id: "5",
    name: "James Wilson",
    initials: "JW",
    location: "Bristol, UK",
    review:
      "Back glass was shattered after a drop. The replacement matches perfectly and the finish is spotless. This is now my default shop for anything device-related.",
    rating: 5,
    device: "OnePlus 11",
    service: "Back Glass Replacement",
    date: "1 day ago",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    initials: "LA",
    location: "Edinburgh, UK",
    review:
      "Kids cracked our iPad screen — stressful, but they turned it around quickly and included a screen protector. Friendly staff and a tidy, welcoming shop.",
    rating: 5,
    device: "iPad Air",
    service: "Screen Repair",
    date: "4 days ago",
  },
]
