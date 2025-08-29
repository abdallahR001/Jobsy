import Card from "../Card/Card";

export default function Features(){
    return (
        <section className="bg-indigo-500 py-16">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="font-bold text-3xl text-center text-indigo-700 mb-12">Why Choose Jobsy?</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 grid-cols-1">
                    <Card 
                    title={"Apply for Jobs"} 
                    description={"Find the best jobs tailored for your skills and apply with one click."}
                    />
                    <Card 
                    title={"Find the Best Candidates"} 
                    description={"Find the best candidates as a company/agency faster than ever."}
                    />
                    <Card  
                    title={"Enhance Your Resume with AI"} 
                    description={"Get AI-powered suggestions to improve your resume and stand out."}
                    />
                </div>
            </div>
        </section>
    )
}