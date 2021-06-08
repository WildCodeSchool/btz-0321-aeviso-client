import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import CreateProfessionsForm from "./CreateProfessionsForm";


interface Data {
    id: number;
    name: string;
    profession: string | null;
    }

function Professions() {
    const { isLoading, error, data } = useQuery<Data[], Error>("professions", async () => {
        const { data } = await axios.get("http://localhost:5000/api/v1/professions");
        console.log(data);
       

        return data;

    }
    );
if (isLoading) return <p>Loading...</p> 
if (error) return <p>An error has occurred : {error.message}</p> 
if (data)

    return (
        <div>
            <h3 className="mb-6">Professions test</h3>

        <div>
            {data?.map((profession) => {
            return (
                <div key={profession.id}>
                    <Link to={`/Profession/${profession.id}`}>
                    <p>
                        {profession.name} 
                    </p>
                </Link>
                </div>
            );
        })} 
            </div>
                <CreateProfessionsForm />
          </div>  

        );      
    }
    export default Professions;