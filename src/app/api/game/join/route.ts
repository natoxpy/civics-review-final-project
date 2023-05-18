import { NextRequest, NextResponse } from 'next/server';
import { GameData } from '../data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("id");
    const playerName = searchParams.get("player_name");

    if (gameId === null) {
        return NextResponse.json({"error": "no game id", "message": "Could not join"}, {
            status: 404,
        });
    }

    let gameIdInt; 
    try {
        gameIdInt = parseInt(gameId);        
    } catch (error) {
        return NextResponse.json({"error": "invalid game id", "message": "Could not join"}, {
            status: 404,
        });
    }

    if (playerName === null) {
        return NextResponse.json({"error": "no player name", "message": "Could not join"}, {
            status: 404,
        });
    }

    const player = GameData.instance.joinGame(gameIdInt, playerName)

    return NextResponse.json({ "message": "Joined game", data: {
        player_uuid: player?.uuid,
    }});
}