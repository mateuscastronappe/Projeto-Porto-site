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
            console.log(data); 
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
            <form onSubmit={handleSubmit} className='formPerguntas'>
                <input
                    type="text"
                    value={pergunta}
                    onChange={(e) => setPergunta(e.target.value)}
                    placeholder="Faça sua pergunta"
                    required
                />
                <button type="submit" className=" botaoAddPergunta">Adicionar</button>
            </form>
            <div>
                <h3 className="perguntasEnviada">Perguntas Enviadas:</h3>
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