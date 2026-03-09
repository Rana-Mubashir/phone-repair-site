import CounterCard from "./CounterCard"

function Main() {
    const data = [
        {
            id: 1,
            text: "Mobiles Repaired",
            startCount: 2350,
            endCount: 2550,
            icon: "📱",
        },
        {
            id: 2,
            text: "Expert Technicians",
            startCount: 46,
            endCount: 246,
            icon: "👨‍🔧",
        },
        {
            id: 3,
            text: "Happy Customers",
            startCount: 753,
            endCount: 935,
            icon: "😊",
        },
        {
            id: 4,
            text: "Desktop Repaired",
            startCount: 2030,
            endCount: 2230,
            icon: "🖥️",
        },
    ]
    return (
        <div
            className="w-full py-10 my-10 bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(rgba(7, 26, 68, 0.85), rgba(7, 26, 68, 0.85)), 
                      url('https://imageio.forbes.com/specials-images/imageserve/61ca56f11d7ac666fbd109b3/Rethinking-hardware-designs-to-improve-their-repairability-is--a-new-imperative-for/960x0.jpg?format=jpg&width=960')`,
            }}
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.map((dat) => (
                        <CounterCard key={dat.id} data={dat} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Main
