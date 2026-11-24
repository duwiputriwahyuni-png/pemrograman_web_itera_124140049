from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPConflict,
    HTTPNotFound,
)
from pyramid.view import view_config

from ..models import Matakuliah

REQUIRED_FIELDS = ['kode_mk', 'nama_mk', 'sks', 'semester']


def _error(response_class, message):
    """Membuat response error berformat JSON"""
    return response_class(json_body={'error': message})


def _not_found(mk_id):
    return _error(
        HTTPNotFound, f'Matakuliah dengan ID {mk_id} tidak ditemukan')


def _is_positive_int(value):
    """True jika value integer > 0 (boolean ditolak)"""
    return isinstance(value, int) and not isinstance(value, bool) \
        and value > 0


def _is_filled_text(value):
    return isinstance(value, str) and value.strip() != ''


def _get_json(request):
    """Ambil body JSON; kembalikan (data, error_response)"""
    try:
        data = request.json_body
    except ValueError:
        return None, _error(HTTPBadRequest, 'Body harus berupa JSON valid')
    if not isinstance(data, dict):
        return None, _error(
            HTTPBadRequest, 'Body JSON harus berupa object')
    return data, None


def _validate_fields(data, fields):
    """Validasi field yang diberikan; kembalikan pesan error atau None"""
    for field in fields:
        value = data[field]
        if field in ('kode_mk', 'nama_mk'):
            if not _is_filled_text(value):
                return f'Field {field} harus berupa teks dan tidak kosong'
        elif not _is_positive_int(value):
            return f'Field {field} harus berupa bilangan bulat lebih dari 0'
    return None


def _kode_exists(dbsession, kode_mk, exclude_id=None):
    query = dbsession.query(Matakuliah).filter_by(kode_mk=kode_mk)
    if exclude_id is not None:
        query = query.filter(Matakuliah.id != exclude_id)
    return query.first() is not None


# 1. READ ALL
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """Mengambil seluruh daftar mata kuliah"""
    items = request.dbsession.query(Matakuliah).order_by(
        Matakuliah.id.asc()).all()
    return {'matakuliahs': [m.to_dict() for m in items]}


# 2. READ ONE
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """Mengambil detail satu mata kuliah berdasarkan ID"""
    mk_id = int(request.matchdict['id'])
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return _not_found(mk_id)
    return {'matakuliah': mk.to_dict()}


# 3. CREATE
@view_config(route_name='matakuliah_add', request_method='POST',
             renderer='json')
def matakuliah_add(request):
    """Menambahkan mata kuliah baru dari payload JSON"""
    data, error = _get_json(request)
    if error:
        return error

    for field in REQUIRED_FIELDS:
        if field not in data or data[field] in (None, ''):
            return _error(HTTPBadRequest, f'Field {field} wajib diisi!')

    message = _validate_fields(data, REQUIRED_FIELDS)
    if message:
        return _error(HTTPBadRequest, message)

    dbsession = request.dbsession
    kode_mk = data['kode_mk'].strip()
    if _kode_exists(dbsession, kode_mk):
        return _error(
            HTTPConflict, f'Kode MK {kode_mk} sudah terdaftar')

    mk = Matakuliah(
        kode_mk=kode_mk,
        nama_mk=data['nama_mk'].strip(),
        sks=data['sks'],
        semester=data['semester'],
    )
    dbsession.add(mk)
    # flush agar id dari sequence PostgreSQL langsung terisi
    dbsession.flush()
    return {'success': True, 'matakuliah': mk.to_dict()}


# 4. UPDATE
@view_config(route_name='matakuliah_update', request_method='PUT',
             renderer='json')
def matakuliah_update(request):
    """Memperbarui data mata kuliah berdasarkan ID"""
    dbsession = request.dbsession
    mk_id = int(request.matchdict['id'])
    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return _not_found(mk_id)

    data, error = _get_json(request)
    if error:
        return error

    provided = [f for f in REQUIRED_FIELDS if f in data]
    message = _validate_fields(data, provided)
    if message:
        return _error(HTTPBadRequest, message)

    if 'kode_mk' in data:
        kode_mk = data['kode_mk'].strip()
        if _kode_exists(dbsession, kode_mk, exclude_id=mk_id):
            return _error(
                HTTPConflict, f'Kode MK {kode_mk} sudah terdaftar')
        mk.kode_mk = kode_mk
    if 'nama_mk' in data:
        mk.nama_mk = data['nama_mk'].strip()
    if 'sks' in data:
        mk.sks = data['sks']
    if 'semester' in data:
        mk.semester = data['semester']

    return {'success': True, 'matakuliah': mk.to_dict()}


# 5. DELETE
@view_config(route_name='matakuliah_delete', request_method='DELETE',
             renderer='json')
def matakuliah_delete(request):
    """Menghapus mata kuliah berdasarkan ID"""
    dbsession = request.dbsession
    mk_id = int(request.matchdict['id'])
    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return _not_found(mk_id)

    dbsession.delete(mk)
    return {
        'success': True,
        'message': f'Matakuliah dengan ID {mk_id} berhasil dihapus',
    }
