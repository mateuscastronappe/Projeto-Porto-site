import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const bancoPath = path.join(process.cwd(), 'src', 'data', 'banco.json');

export async function POST(request: Request) {
    try {
        const { pergunta } = await request.json();
        
        const data = JSON.parse(fs.readFileSync(bancoPath, 'utf-8'));

        if (!data.perguntas) {
            data.perguntas = [];
        }

        data.perguntas.push(pergunta);
        fs.writeFileSync(bancoPath, JSON.stringify(data, null, 2));

        return NextResponse.json({ message: 'Pergunta enviada com sucesso!' }, { status: 200 });
    } catch {
        return NextResponse.json({ message: 'Erro ao salvar a pergunta.' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const data = JSON.parse(fs.readFileSync(bancoPath, 'utf-8'));
        return NextResponse.json(data, { status: 200 });
    } catch {
        return NextResponse.json({ message: 'Erro ao carregar as perguntas.' }, { status: 500 });
    }
}
