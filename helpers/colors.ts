export const storyForm_colors = {
  primary: "#6B46C1",
  secondary: "#FBBF24",
  accent: "#F472B6",
  background: "#E0F2FE",
  text: "#1E3A8A",
};

export const getThemeColor = (theme: string) => {
    const colors: { [key: string]: string } = {
      adventure: "bg-orange-100 text-orange-800 border-orange-200",
      fantasy: "bg-purple-100 text-purple-800 border-purple-200",
      mystery: "bg-indigo-100 text-indigo-800 border-indigo-200",
      friendship: "bg-pink-100 text-pink-800 border-pink-200",
      family: "bg-green-100 text-green-800 border-green-200",
      default: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[theme.toLowerCase()] || colors.default
  }

  export const getMoodColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      exciting: "bg-red-100 text-red-800 border-red-200",
      calm: "bg-blue-100 text-blue-800 border-blue-200",
      happy: "bg-yellow-100 text-yellow-800 border-yellow-200",
      mysterious: "bg-purple-100 text-purple-800 border-purple-200",
      default: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[mood.toLowerCase()] || colors.default
  }