import FollowedCompanies from "../components/FollowedCompanies/FollowedCompanies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function FollowedCompaniesPage() {
  const cookieStore = cookies();

  const token = (await cookieStore).get("token")?.value;

  if (!token) redirect("/login/jobseeker");

  const response = await fetch(
    "http://localhost:4000/api/users/followed-companies",
     {
       headers: {
         token: token,
       },
       cache: "no-store",
     }
  );

  const data = await response.json();

  console.log(data);
  

  if (response.status === 401 || response.status === 403)
    redirect("/login/jobseeker");

  const companies = data.followedCompanies || [];

  return (
    <FollowedCompanies companies={companies}/>
  );
}