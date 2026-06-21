export type Testimonial = {
  id: string
  name: string
  initials: string
  location: string
  review: string
  rating: number
  device: string
  service: string
  date: string
}

export type RatingBreakdownItem = {
  stars: number
  percent: number
}

export type ReviewStats = {
  average: number
  totalReviews: number
  recommendPercent: number
}
