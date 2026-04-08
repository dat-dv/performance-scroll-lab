export const createMockItems = (count: number, offset: number = 0) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + offset,
    title: `Project Alpha-${i + offset + 1}`,
    category: i % 3 === 0 ? "Design" : i % 3 === 1 ? "Development" : "Marketing",
    color: [
      "from-blue-500 to-indigo-600",
      "from-emerald-400 to-teal-600",
      "from-rose-400 to-orange-500",
      "from-purple-500 to-pink-600",
      "from-amber-400 to-yellow-600",
    ][i % 5],
  }));
