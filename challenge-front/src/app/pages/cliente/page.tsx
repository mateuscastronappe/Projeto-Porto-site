"use client";
import type { Cliente } from "@/types";
import { useEffect, useState } from "react";

export default function ClienteComponent() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newCliente, setNewCliente] = useState<Cliente>({
        codigo: 0,  // Mantenha como 0, mas não o use para exclusão
        nome: "",
        cpf: "",
        email: "",
        dataDeNascimento: "",
    });

    useEffect(() => {
        const chamadaApiJava = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/cliente");
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        chamadaApiJava();
    }, []);

    // Função para adicionar um novo cliente
    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/cliente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCliente),
            });
            if (response.ok) {
                const clienteAdicionado = await response.json();
                console.log("Cliente adicionado:", clienteAdicionado); // Log do cliente adicionado
                // Atualizar o estado com o cliente retornado
                setClientes(prevClientes => [...prevClientes, clienteAdicionado]);
                // Resetar os campos do formulário
                setNewCliente({ codigo: 0, nome: "", cpf: "", email: "", dataDeNascimento: "" });
            } else {
                console.error("Erro ao adicionar cliente");
            }
        } catch (error) {
            console.error("Erro ao adicionar cliente:", error);
        }
    };

    // Função para editar um cliente
    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    // Função para salvar as alterações de um cliente
    const handleSave = async (codigo: number) => {
        const clienteEditado = clientes.find(cliente => cliente.codigo === codigo);
        if (!clienteEditado) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/cliente/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clienteEditado),
            });
            if (response.ok) {
                setIsEditing(null);
            } else {
                console.error("Erro ao editar cliente");
            }
        } catch (error) {
            console.error("Erro ao editar cliente:", error);
        }
    };

    // Função para excluir um cliente
    const handleDelete = async (codigo: number) => {
        console.log("Tentando excluir cliente com código:", codigo); // Log do código do cliente
        try {
            const response = await fetch(`http://localhost:8080/consultar/cliente/${codigo}`, {
                method: "DELETE",
            });
            console.log(`Resposta da API ao excluir cliente ${codigo}:`, response);
            if (response.ok) {
                // Atualizar a lista de clientes ao excluir
                setClientes(prevClientes => prevClientes.filter(cliente => cliente.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error(`Erro ao excluir cliente: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    };

    return (
        <div>
            <h1>Clientes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Data de Nascimento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.codigo}>
                            <td>{cliente.codigo}</td>
                            <td>
                                {isEditing === cliente.codigo ? (
                                    <input
                                        type="text"
                                        value={cliente.nome}
                                        onChange={e =>
                                            setClientes(
                                                clientes.map(c =>
                                                    c.codigo === cliente.codigo
                                                        ? { ...c, nome: e.target.value }
                                                        : c
                                                )
                                            )
                                        }
                                    />
                                ) : (
                                    cliente.nome
                                )}
                            </td>
                            <td>{cliente.cpf}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.dataDeNascimento}</td>
                            <td>
                                {isEditing === cliente.codigo ? (
                                    <button onClick={() => handleSave(cliente.codigo)}>Salvar</button>
                                ) : (
                                    <button onClick={() => handleEdit(cliente.codigo)}>Editar</button>
                                )}
                                <button onClick={() => handleDelete(cliente.codigo)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Adicionar Novo Cliente</h2>
            <input
                type="text"
                placeholder="Nome"
                value={newCliente.nome}
                onChange={e => setNewCliente({ ...newCliente, nome: e.target.value })}
            />
            <input
                type="text"
                placeholder="CPF"
                value={newCliente.cpf}
                onChange={e => setNewCliente({ ...newCliente, cpf: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={newCliente.email}
                onChange={e => setNewCliente({ ...newCliente, email: e.target.value })}
            />
            <input
                type="date"
                placeholder="Data de Nascimento"
                value={newCliente.dataDeNascimento}
                onChange={e => setNewCliente({ ...newCliente, dataDeNascimento: e.target.value })}
            />
            <button onClick={handleAdd}>Adicionar</button>
        </div>
    );
}
