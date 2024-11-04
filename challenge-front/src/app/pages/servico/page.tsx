"use client";
import type { Servico } from "@/types";
import { useEffect, useState } from "react";

export default function ServicoComponent() {
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newServico, setNewServico] = useState<Servico>({
        codigo: 0,
        descricaoDoServico: "",
        valorDoServico: 0,
    });

    useEffect(() => {
        const chamadaApiJava = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/servico");
                const data = await response.json();
                setServicos(data);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        };

        chamadaApiJava();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/servico", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newServico),
            });
            if (response.ok) {
                const servicoAdicionado = await response.json();
                console.log("Serviço adicionado:", servicoAdicionado);
                setServicos(prevServicos => [...prevServicos, servicoAdicionado]);
                setNewServico({ codigo: 0, descricaoDoServico: "", valorDoServico: 0 });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar serviço");
            }
        } catch (error) {
            console.error("Erro ao adicionar serviço:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const servicoEditado = servicos.find(servico => servico.codigo === codigo);
        if (!servicoEditado) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/servico/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(servicoEditado),
            });
            if (response.ok) {
                setServicos(prevServicos => 
                    prevServicos.map(s => (s.codigo === codigo ? { ...servicoEditado } : s))
                );
                setIsEditing(null);
            } else {
                console.error("Erro ao editar serviço");
            }
        } catch (error) {
            console.error("Erro ao editar serviço:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        console.log("Tentando excluir serviço com código:", codigo);
        try {
            const response = await fetch(`http://localhost:8080/consultar/servico/${codigo}`, {
                method: "DELETE",
            });
            console.log(`Resposta da API ao excluir serviço ${codigo}:`, response);
            if (response.ok) {
                setServicos(prevServicos => prevServicos.filter(servico => servico.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error(`Erro ao excluir serviço: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro ao excluir serviço:", error);
        }
    };

    return (
        <div className="clientes-container">
            <h1 className="clientes-title">Serviços</h1>
            <table className="clientes-table">
                <thead>
                    <tr className="clientes-header">
                        <th className="clientes-header-cell">Código</th>
                        <th className="clientes-header-cell">Descrição do Serviço</th>
                        <th className="clientes-header-cell">Valor do Serviço</th>
                        <th className="clientes-header-cell">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {servicos.map(servico => (
                        <tr key={servico.codigo} className="clientes-row">
                            <td className="clientes-cell">{servico.codigo}</td>
                            <td className="clientes-cell">
                                {isEditing === servico.codigo ? (
                                    <input
                                        type="text"
                                        value={servico.descricaoDoServico}
                                        onChange={e =>
                                            setServicos(
                                                servicos.map(s =>
                                                    s.codigo === servico.codigo
                                                        ? { ...s, descricaoDoServico: e.target.value }
                                                        : s
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : servico.descricaoDoServico
                                }
                            </td>
                            <td className="clientes-cell">
                                {isEditing === servico.codigo ? (
                                    <input
                                        type="number"
                                        value={servico.valorDoServico}
                                        onChange={e =>
                                            setServicos(
                                                servicos.map(s =>
                                                    s.codigo === servico.codigo
                                                        ? { ...s, valorDoServico: Number(e.target.value) }
                                                        : s
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    servico.valorDoServico.toFixed(2)
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === servico.codigo ? (
                                    <button onClick={() => handleSave(servico.codigo)} className="clientes-button-save">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(servico.codigo)} className="clientes-button-edit">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(servico.codigo)} className="clientes-button-delete">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="clientes-add-title">Adicionar Novo Serviço</h2>
            <div className="clientes-add-form">
                <input
                    type="text"
                    placeholder="Descrição do Serviço"
                    value={newServico.descricaoDoServico}
                    onChange={e => setNewServico({ ...newServico, descricaoDoServico: e.target.value })}
                    className="clientes-input"
                />
                <input
                    type="number"
                    placeholder="Valor do Serviço"
                    value={newServico.valorDoServico}
                    onChange={e => setNewServico({ ...newServico, valorDoServico: Number(e.target.value) })}
                    className="clientes-input"
                />
                <button onClick={handleAdd} className="clientes-button-add">
                    Adicionar
                </button>
            </div>
        </div>
    );
}