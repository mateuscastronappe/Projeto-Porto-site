import Image from 'next/image'; 
import { StaticImageData } from 'next/image';

interface ServiceCardProps {
    imageSrc: string | StaticImageData; 
    altText: string;
    title: string;
    description: string;
}

function ServiceCard({ imageSrc, altText, title, description }: ServiceCardProps) {
    return (
        <div className="bg-[#f1f0f0] my-2 mt-2 p-4 rounded-[8px] inline-block w-[250px] shadow-lg transition-transform duration-200 hover:bg-[#a5c9f8] hover:translate-y-[-10px]">
            <Image
                src={imageSrc}
                alt={altText}
                width={500} 
                height={300} 
                layout="responsive" 
                className="rounded-[8px] pb-2"
            />
            <h3 className="mt-[15px] text-[1.5em]">{title}</h3>
            <p className="text-[#464545]">{description}</p>
        </div>
    );
}

export default ServiceCard;
