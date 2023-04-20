package com.ssafy.churest.service;

import com.ssafy.churest.dto.req.BoardRequestDto;
import com.ssafy.churest.dto.resp.BoardResponseDto;
import com.ssafy.churest.dto.resp.TreeLogResponseDto;
import com.ssafy.churest.dto.resp.TreeResponseDto;
import com.ssafy.churest.entity.Board;
import com.ssafy.churest.entity.Member;
import com.ssafy.churest.entity.Tag;
import com.ssafy.churest.entity.TreeLog;
import com.ssafy.churest.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service("BoardService")
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private static final int TREE_SIZE = 10;

    private static final int TREE_CRITERIA_SCORE = 16;

    private final GCSService gcsService;

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final PhotoRepository photoRepository;
    private final TreeRepository treeRepository;
    private final TreeLogRepository treeLogRepository;
    private final TagRepository tagRepository;

    @Override
    public boolean checkTreeLocation(int memberId, BoardRequestDto.LocationInfo locationInfo) {
        //  해당 위치에서 어느 영역까지 안되는건지 ㅜ
        //  ㅁㅊ 기록에서 x,y 다 뒤져야하는?;;;
        return false;
    }

    @Override
    public void writeTree(List<MultipartFile> fileList, BoardRequestDto.Write writeInfo) throws IOException {

        //  먼저 위치 확인 해주기...? FE에서 먼저 해주나?

        //  나무 랜덤 매칭
        int treeId = (int) (Math.random() * TREE_SIZE) + 1;

        Board board = boardRepository.save(Board.builder()
                        .tree(treeRepository.findByTreeId(treeId))
                        .title(writeInfo.getTitle())
                        .content(writeInfo.getContent())
                        .weather(writeInfo.getWeather())
                        .locationX(writeInfo.getLocationX())
                        .locationY(writeInfo.getLocationY())
                        .build());

        //  GCS 사진 업로드
        for (MultipartFile file :
             fileList) {
                if(file != null)
                    gcsService.uploadBoardImage(file, board);
        }

        //  태그된 사용자 알림 생성 추가해야 함
        for (int tagMemberId:
             writeInfo.getTagList()) {
            tagRepository.save(Tag.builder()
                            .member(memberRepository.findByMemberId(tagMemberId))
                            .board(board)
                    .build());
            //  알림 생성
        }

        //  나무 로그 생성
        treeLogRepository.save(TreeLog.builder().board(board).build());
    }

    @Override
    public void writeTreeFromFriend(int boardId, BoardRequestDto.LocationInfo locationInfo) {

        Board friendBoard = boardRepository.findByBoardId(boardId);

        boardRepository.save(Board.builder()
                .tree(friendBoard.getTree())
                .title(friendBoard.getTitle())
                .content(friendBoard.getContent())
                .weather(friendBoard.getWeather())
                .locationX(locationInfo.getLocationX())
                .locationY(locationInfo.getLocationY())
                .build());

        // 샹 Entity 수정이 필요할 듯
    }

    @Override
    public List<BoardResponseDto.BoardInfo> getBoardInfoList(int memberId) {
        //  나무 위치 조회수
        List<Board> boardList = boardRepository.findAllByIsDeletedIsFalseAndMember_MemberId(memberId);

        BoardResponseDto.BoardInfo boardInfo = BoardResponseDto.BoardInfo.builder()
                .build();
        return boardList.stream().map(board -> {
            return BoardResponseDto.BoardInfo.fromEntity(board, treeLogRepository.findTop1ByBoard_BoardId(board.getBoardId()));
//            BoardResponseDto.BoardInfo.builder()
//                    .locationX(board.getLocationX())
//                    .locationY(board.getLocationY())
//                            .score(treeLogRepository.findTop1ByOrderByDateAscAndBoard_BoardId(board.getBoardId()).getScore())
//                    .build()
        }).collect(Collectors.toList());
    }

    @Override
    public BoardResponseDto.BoardDetailInfo getBoardDetailInfo(int boardId) {

        Board board = boardRepository.findByBoardId(boardId);

        if(board.isDeleted())
            return null;

        BoardResponseDto.BoardDetailInfo boardDetailInfo = BoardResponseDto.BoardDetailInfo.fromEntity(board);

        TreeLog recentTreeLog = treeLogRepository.findTop1ByBoard_BoardId(board.getBoardId());
        if(recentTreeLog.getScore() >= TREE_CRITERIA_SCORE){
            //  정렬?
            //  나무 성장 로그
            List<TreeLog> treeLogList = treeLogRepository.findAllByBoard_BoardId(board.getBoardId());
            boardDetailInfo.setTreeLogInfoList(treeLogList.stream().map(TreeLogResponseDto.TreeLogInfo::fromEntity).collect(Collectors.toList()));

            //  나무
            boardDetailInfo.setTreeInfo(TreeResponseDto.TreeInfo.fromEntity(board.getTree()));
        }

        //  파일 리스트
//        boardDetailInfo.setFileList(photoRepository.findAllByBoardId(boardId).stream().map(photo -> photo.getFile()).collect(Collectors.toList()));

        //  태그된 사용자 id
        List<Tag> tagList = tagRepository.findAllByBoard_BoardId(board.getBoardId());
        boardDetailInfo.setTagList(tagList.stream().map(tag -> tag.getMember().getMemberId()).collect(Collectors.toList()));
//        boardDetailInfo.setTagList(tagRepository.findAllByBoard_BoardId(board.getBoardId()).stream().map(tag -> tag.getMember().getMemberId()).collect(Collectors.toList()));

        return boardDetailInfo;
    }
}
