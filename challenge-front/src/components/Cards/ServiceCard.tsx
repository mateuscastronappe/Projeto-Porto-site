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
        <div className="card">
            <Image
                src={imageSrc}
                alt={altText}
                width={500} 
                height={300} 
                layout="responsive" 
                className="rounded-[8px] pb-2"
            />
            <h3 className=" titulo mt-[15px] text-[1.5em]">{title}</h3>
            <p className=" descricrao text-[#464545]">{description}</p>
        </div>
    );
}

export default ServiceCard;
