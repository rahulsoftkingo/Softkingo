import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // tumhare project me already hona chahiye

export const runtime = "nodejs";

export async function GET() {
  try {
    const tables = await prisma.$queryRaw`
      SELECT
        TABLE_NAME as tableName,
        ENGINE as engine,
        TABLE_ROWS as tableRows,
        DATA_LENGTH as dataBytes,
        INDEX_LENGTH as indexBytes,
        (DATA_LENGTH + INDEX_LENGTH) as totalBytes
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
      ORDER BY (DATA_LENGTH + INDEX_LENGTH) DESC;
    `;

    const dbTotal = await prisma.$queryRaw`
      SELECT
        TABLE_SCHEMA as dbName,
        SUM(DATA_LENGTH + INDEX_LENGTH) as totalBytes
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
      GROUP BY TABLE_SCHEMA;
    `;

    const norm = (v) => (typeof v === "bigint" ? Number(v) : (v ?? 0));

    const db = dbTotal?.[0] || { dbName: "database", totalBytes: 0 };

    const tableOut = (tables || []).map((t) => ({
      tableName: t.tableName,
      engine: t.engine,
      tableRows: norm(t.tableRows),
      dataBytes: norm(t.dataBytes),
      indexBytes: norm(t.indexBytes),
      totalBytes: norm(t.totalBytes),
    }));

    return NextResponse.json({
      ok: true,
      dbName: db.dbName,
      totalBytes: norm(db.totalBytes),
      tables: tableOut,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "DB usage failed" },
      { status: 500 }
    );
  }
}
