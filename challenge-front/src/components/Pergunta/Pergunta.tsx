import { useState, useEffect } from 'react';

const PerguntaForm = () => {
    const [pergunta, setPergunta] = useState('');
    const [perguntas, setPerguntas] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/perguntas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pergunta }),
            });
            if (!res.ok) {
                const errorData = await res.text(); 
                window.alert('Erro ao enviar a pergunta: ' + errorData);
                return;
            }

            const data = await res.json(); 
            setPerguntas((prevPerguntas) => [...prevPerguntas, pergunta]);
            window.alert('Pergunta enviada com sucesso!'); 
            setPergunta(''); 
        } catch (error: unknown) {
            if (error instanceof Error) {
                window.alert('Erro ao enviar a pergunta: ' + error.message);
            } else {
                console.error('Erro desconhecido:', error);
                window.alert('Erro ao enviar a pergunta: Erro desconhecido.');
            }
        }
    };

    useEffect(() => {
        const fetchPerguntas = async () => {
            const response = await fetch('/api/perguntas'); 
            if (response.ok) {
                const data = await response.json();
                setPerguntas(data.perguntas);
            }
        };
        fetchPerguntas();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={pergunta}
                    onChange={(e) => setPergunta(e.target.value)}
                    placeholder="Faça sua pergunta"
                     required
                        className="flex-1 p-2.5 text-base placeholder:text-gray-500"
                />
                <button type="submit" className=" botaoAddPergunta flex-1 p-1.5 text-base text-white bg-[#1961cc] border border-[#0e3674] rounded cursor-pointer">Adicionar</button>
            </form>
            <div>
                <h3 className="text-[#00369b] text-left text-xl">Perguntas Enviadas:</h3>
                <ul>
                    {perguntas.map((p, index) => (
                        <li key={index}>{p}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PerguntaForm;