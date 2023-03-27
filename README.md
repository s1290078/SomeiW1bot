# Trash-bot

## 目的
1:寮生活で出るゴミを忘れずに担当の人が出すように通知して知らせる。

2:javascript,botアプリケーション作成の学習のために実装。

3:プログラミング教育の場面で、アプリケーションの仕組みの説明、到達目標の一つとして用いる。

## 構成
Google Apps Script を用いて実装している。GASのサーバに投げることでBotを運用している。
LINEbotとして運用することで通知を確認しやすいようにした。

## 機能
・指定した時刻に曜日ごとに出すゴミの種類と担当者を自動通知する。
・指定した時刻に寮内ミーティングを自動通知する。
・メッセージを送信すると要件を問われ、クイックリプライによるメッセージを選択するとそれに応じた返信が返ってくる。
