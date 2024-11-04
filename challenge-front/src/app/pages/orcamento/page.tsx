"use client";
import type { Orcamento } from "@/types";
import { useEffect, useState } from "react";

export default function Orcamento() {
    const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newOrcamento, setNewOrcamento] = useState<Orcamento>({
        codigo: 0,
        quantidadeDePeca: 0,
        valorDoOrcamento: 0,
        horasTrabalhadas: 0,
    });

    useEffect(() => {
        const chamadaApiJava = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/orcamento");
                const data = await response.json();
                setOrcamentos(data);
            } catch (error) {
                console.error("Erro ao buscar orçamentos:", error);
            }
        };

        chamadaApiJava();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/orcamento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrcamento),
            });
            if (response.ok) {
                const orcamentoAdicionado = await response.json();
                setOrcamentos(prevOrcamentos => [...prevOrcamentos, orcamentoAdicionado]);
                setNewOrcamento({ codigo: 0, quantidadeDePeca: 0, valorDoOrcamento: 0, horasTrabalhadas: 0 });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar orçamento");
            }
        } catch (error) {
            console.error("Erro ao adicionar orçamento:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const orcamentoEditado = orcamentos.find(orcamento => orcamento.codigo === codigo);
        if (!orcamentoEditado) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/orcamento/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orcamentoEditado),
            });
            if (response.ok) {
                setIsEditing(null);
            } else {
                console.error("Erro ao editar orçamento");
            }
        } catch (error) {
            console.error("Erro ao editar orçamento:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/orcamento/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setOrcamentos(prevOrcamentos => prevOrcamentos.filter(orcamento => orcamento.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error(`Erro ao excluir orçamento: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro ao excluir orçamento:", error);
        }
    };

    return (
        <div className="clientes-container">
            <h1 className="clientes-title">Orçamentos</h1>
            <table className="clientes-table">
                <thead>
                    <tr className="clientes-header">
                        <th className="clientes-header-cell">Código</th>
                        <th className="clientes-header-cell">Quantidade de Peças</th>
                        <th className="clientes-header-cell">Valor do Orçamento</th>
                        <th className="clientes-header-cell">Horas Trabalhadas</th>
                        <th className="clientes-header-cell">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orcamentos.map(orcamento => (
                        <tr key={orcamento.codigo} className="clientes-row">
                            <td className="clientes-cell">{orcamento.codigo}</td>
                            <td className="clientes-cell">
                                {isEditing === orcamento.codigo ? (
                                    <input
                                        type="number"
                                        value={orcamento.quantidadeDePeca}
                                        onChange={e =>
                                            setOrcamentos(
                                                orcamentos.map(o =>
                                                    o.codigo === orcamento.codigo
                                                        ? { ...o, quantidadeDePeca: parseInt(e.target.value) }
                                                        : o
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    orcamento.quantidadeDePeca
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === orcamento.codigo ? (
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={orcamento.valorDoOrcamento}
                                        onChange={e =>
                                            setOrcamentos(
                                                orcamentos.map(o =>
                                                    o.codigo === orcamento.codigo
                                                        ? { ...o, valorDoOrcamento: parseFloat(e.target.value) }
                                                        : o
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    orcamento.valorDoOrcamento.toFixed(2)
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === orcamento.codigo ? (
                                    <input
                                        type="number"
                                        value={orcamento.horasTrabalhadas}
                                        onChange={e =>
                                            setOrcamentos(
                                                orcamentos.map(o =>
                                                    o.codigo === orcamento.codigo
                                                        ? { ...o, horasTrabalhadas: parseInt(e.target.value) }
                                                        : o
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    orcamento.horasTrabalhadas
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === orcamento.codigo ? (
                                    <button onClick={() => handleSave(orcamento.codigo)} className="clientes-button-save">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(orcamento.codigo)} className="clientes-button-edit">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(orcamento.codigo)} className="clientes-button-delete">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="clientes-add-title">Adicionar Novo Orçamento</h2>
            <div className="clientes-add-form">
                <input
                    type="number"
                    placeholder="Quantidade de Peças"
                    value={newOrcamento.quantidadeDePeca}
                    onChange={e => setNewOrcamento({ ...newOrcamento, quantidadeDePeca: parseInt(e.target.value) })}
                    className="clientes-input"
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Valor do Orçamento"
                    value={newOrcamento.valorDoOrcamento}
                    onChange={e => setNewOrcamento({ ...newOrcamento, valorDoOrcamento: parseFloat(e.target.value) })}
                    className="clientes-input"
                />
                <input
                    type="number"
                    placeholder="Horas Trabalhadas"
                    value={newOrcamento.horasTrabalhadas}
                    onChange={e => setNewOrcamento({ ...newOrcamento, horasTrabalhadas: parseInt(e.target.value) })}
                    className="clientes-input"
                />
                <button onClick={handleAdd} className="clientes-button-add">
                    Adicionar
                </button>
            </div>
        </div>
    );
}
