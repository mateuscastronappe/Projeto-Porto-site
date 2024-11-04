"use client";
import type { Peca } from "@/types";
import { useEffect, useState } from "react";

export default function Peca() {
    const [pecas, setPecas] = useState<Peca[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newPeca, setNewPeca] = useState<Peca>({
        codigo: 0,
        nomeDaPeca: "",
        valorUnitario: 0,
    });

    useEffect(() => {
        const chamadaApiJava = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/peca");
                const data = await response.json();
                setPecas(data);
            } catch (error) {
                console.error("Erro ao buscar peças:", error);
            }
        };

        chamadaApiJava();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/peca", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPeca),
            });
            if (response.ok) {
                const pecaAdicionada = await response.json();
                console.log("Peça adicionada:", pecaAdicionada);
                setPecas(prevPecas => [...prevPecas, pecaAdicionada]);
                setNewPeca({ codigo: 0, nomeDaPeca: "", valorUnitario: 0 });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar peça");
            }
        } catch (error) {
            console.error("Erro ao adicionar peça:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const pecaEditada = pecas.find(peca => peca.codigo === codigo);
        if (!pecaEditada) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/peca/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pecaEditada),
            });
            if (response.ok) {
                setIsEditing(null);
            } else {
                console.error("Erro ao editar peça");
            }
        } catch (error) {
            console.error("Erro ao editar peça:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        console.log("Tentando excluir peça com código:", codigo);
        try {
            const response = await fetch(`http://localhost:8080/consultar/peca/${codigo}`, {
                method: "DELETE",
            });
            console.log(`Resposta da API ao excluir peça ${codigo}:`, response);
            if (response.ok) {
                setPecas(prevPecas => prevPecas.filter(peca => peca.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error(`Erro ao excluir peça: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro ao excluir peça:", error);
        }
    };

    return (
        <div className="clientes-container">
            <h1 className="clientes-title">Peças</h1>
            <table className="clientes-table">
                <thead>
                    <tr className="clientes-header">
                        <th className="clientes-header-cell">Código</th>
                        <th className="clientes-header-cell">Nome da Peça</th>
                        <th className="clientes-header-cell">Valor Unitário</th>
                        <th className="clientes-header-cell">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pecas.map(peca => (
                        <tr key={peca.codigo} className="clientes-row">
                            <td className="clientes-cell">{peca.codigo}</td>
                            <td className="clientes-cell">
                                {isEditing === peca.codigo ? (
                                    <input
                                        type="text"
                                        value={peca.nomeDaPeca}
                                        onChange={e =>
                                            setPecas(
                                                pecas.map(p =>
                                                    p.codigo === peca.codigo
                                                        ? { ...p, nomeDaPeca: e.target.value }
                                                        : p
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    peca.nomeDaPeca
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === peca.codigo ? (
                                    <input
                                        type="number"
                                        value={peca.valorUnitario}
                                        onChange={e =>
                                            setPecas(
                                                pecas.map(p =>
                                                    p.codigo === peca.codigo
                                                        ? { ...p, valorUnitario: parseFloat(e.target.value) }
                                                        : p
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    peca.valorUnitario.toFixed(2) // Formatar para exibir duas casas decimais
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === peca.codigo ? (
                                    <button onClick={() => handleSave(peca.codigo)} className="clientes-button-save">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(peca.codigo)} className="clientes-button-edit">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(peca.codigo)} className="clientes-button-delete">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="clientes-add-title">Adicionar Nova Peça</h2>
            <div className="clientes-add-form">
                <input
                    type="text"
                    placeholder="Nome da Peça"
                    value={newPeca.nomeDaPeca}
                    onChange={e => setNewPeca({ ...newPeca, nomeDaPeca: e.target.value })}
                    className="clientes-input"
                />
                <input
                    type="number"
                    placeholder="Valor Unitário"
                    value={newPeca.valorUnitario}
                    onChange={e => setNewPeca({ ...newPeca, valorUnitario: parseFloat(e.target.value) })}
                    className="clientes-input"
                />
                <button onClick={handleAdd} className="clientes-button-add">
                    Adicionar
                </button>
            </div>
        </div>
    );
}
